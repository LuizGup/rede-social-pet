import { useState, useEffect, useCallback } from "react";
import "./Feed.css";
import postService from "../../services/postService";
import likeService from "../../services/likeService";
import followService from "../../services/followService";
import CreatePostBox from "../../components/FeedComponents/CreatePostBox/CreatePostBox";
import PostCard from "../../components/FeedComponents/PostCard/PostCard";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedMode, setFeedMode] = useState("todos"); // "todos" | "seguindo"

  const isLoggedIn = !!localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
  const user = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_KEY));

  const loadFeed = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data =
        feedMode === "seguindo"
          ? await postService.getFollowingFeed()
          : await postService.getFeed();

      // se logado, marca curtidas e quem o usuário já segue (padrão do AnimalList)
      if (isLoggedIn && user?.user_id) {
        const [likes, following] = await Promise.all([
          likeService.getLikesByUser(user.user_id),
          followService.getFollowing(user.user_id),
        ]);

        const likeByPost = new Map(likes.map((l) => [l.fk_post_id, l.like_id]));
        const followByUser = new Map(
          following.map((f) => [f.fk_followed_id, f.follow_id])
        );

        data = data.map((p) => ({
          ...p,
          isLiked: likeByPost.has(p.post_id),
          likeId: likeByPost.get(p.post_id) ?? null,
          isFollowingAuthor: followByUser.has(p.author?.user_id),
          followId: followByUser.get(p.author?.user_id) ?? null,
        }));
      }

      setPosts(data);
    } catch {
      setError("Não foi possível carregar o feed.");
    } finally {
      setLoading(false);
    }
  }, [feedMode, isLoggedIn, user?.user_id]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const handleCreate = async (payload) => {
    const newPost = await postService.createPost(payload);
    // insere no topo sem precisar recarregar tudo
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleToggleLike = async (postId, isLiked, likeId) => {
    if (!isLoggedIn) return;
    try {
      if (isLiked) {
        await likeService.removeLike(likeId);
        setPosts((prev) =>
          prev.map((p) =>
            p.post_id === postId
              ? {
                  ...p,
                  isLiked: false,
                  likeId: null,
                  _count: { ...p._count, likes: (p._count?.likes ?? 1) - 1 },
                }
              : p
          )
        );
      } else {
        const newLike = await likeService.addLike({ fk_post_id: postId });
        setPosts((prev) =>
          prev.map((p) =>
            p.post_id === postId
              ? {
                  ...p,
                  isLiked: true,
                  likeId: newLike.like_id,
                  _count: { ...p._count, likes: (p._count?.likes ?? 0) + 1 },
                }
              : p
          )
        );
      }
    } catch {
      alert("Não foi possível atualizar a curtida.");
    }
  };

  const handleToggleFollow = async (authorId, isFollowing, followId) => {
    if (!isLoggedIn) return;
    try {
      if (isFollowing) {
        await followService.unfollow(followId);
        setPosts((prev) =>
          prev.map((p) =>
            p.author?.user_id === authorId
              ? { ...p, isFollowingAuthor: false, followId: null }
              : p
          )
        );
      } else {
        const newFollow = await followService.follow({ fk_followed_id: authorId });
        setPosts((prev) =>
          prev.map((p) =>
            p.author?.user_id === authorId
              ? { ...p, isFollowingAuthor: true, followId: newFollow.follow_id }
              : p
          )
        );
      }
    } catch {
      alert("Não foi possível atualizar o seguir.");
    }
  };

  const handleDelete = async (post_id) => {
    if (!window.confirm("Tem certeza que deseja apagar este post?")) return;
    try {
      await postService.deletePost(post_id);
      setPosts((prev) => prev.filter((p) => p.post_id !== post_id));
    } catch {
      alert("Não foi possível apagar o post.");
    }
  };

  return (
    <main className="feed-main">
      <div className="custom-title">
        <h1>Feed</h1>
        <p>Veja o que a comunidade está compartilhando sobre seus pets.</p>
      </div>

      <div className="feed-container">
        {isLoggedIn && (
          <div className="feed-tabs">
            <button
              className={`feed-tab ${feedMode === "todos" ? "active" : ""}`}
              onClick={() => setFeedMode("todos")}
            >
              Todos
            </button>
            <button
              className={`feed-tab ${feedMode === "seguindo" ? "active" : ""}`}
              onClick={() => setFeedMode("seguindo")}
            >
              Seguindo
            </button>
          </div>
        )}

        {isLoggedIn ? (
          <CreatePostBox onCreate={handleCreate} />
        ) : (
          <p className="feed-login-hint">
            Faça login para publicar e interagir com a comunidade.
          </p>
        )}

        {loading ? (
          <p className="feed-status">Carregando posts...</p>
        ) : error ? (
          <p className="feed-status feed-error">{error}</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.post_id}
              post={post}
              currentUserId={user?.user_id}
              isLoggedIn={isLoggedIn}
              onDelete={handleDelete}
              onToggleLike={handleToggleLike}
              onToggleFollow={handleToggleFollow}
            />
          ))
        ) : feedMode === "seguindo" ? (
          <p className="feed-status">
            Você ainda não segue ninguém, ou quem você segue não publicou nada. 🐾
          </p>
        ) : (
          <p className="feed-status">Ainda não há posts. Seja o primeiro a publicar! 🐾</p>
        )}
      </div>
    </main>
  );
}

export default Feed;
