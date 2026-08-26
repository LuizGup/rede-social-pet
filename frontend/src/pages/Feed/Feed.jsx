import { useState, useEffect, useCallback } from "react";
import "./Feed.css";
import postService from "../../services/postService";
import CreatePostBox from "../../components/FeedComponents/CreatePostBox/CreatePostBox";
import PostCard from "../../components/FeedComponents/PostCard/PostCard";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoggedIn = !!localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
  const user = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_KEY));

  const loadFeed = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.getFeed();
      setPosts(data);
    } catch {
      setError("Não foi possível carregar o feed.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const handleCreate = async (payload) => {
    const newPost = await postService.createPost(payload);
    // insere no topo sem precisar recarregar tudo
    setPosts((prev) => [newPost, ...prev]);
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
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="feed-status">Ainda não há posts. Seja o primeiro a publicar! 🐾</p>
        )}
      </div>
    </main>
  );
}

export default Feed;
