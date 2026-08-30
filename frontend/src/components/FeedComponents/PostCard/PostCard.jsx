import { useState } from "react";
import "./PostCard.css";
import { formatDateTime } from "../../../utils/formatters";
import commentService from "../../../services/commentService";

function PostCard({ post, currentUserId, isLoggedIn, onDelete, onToggleLike, onToggleFollow }) {
  const author = post.author || {};
  const isAuthor = currentUserId && author.user_id === currentUserId;
  const canFollow = isLoggedIn && !isAuthor && author.user_id;

  const isVideo = post.post_media && /\.(mp4|webm|ogg)$/i.test(post.post_media);

  const likeCount = post._count?.likes ?? 0;
  const initialCommentCount = post._count?.comments ?? 0;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [commentCount, setCommentCount] = useState(initialCommentCount);
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);

  const toggleComments = async () => {
    const next = !showComments;
    setShowComments(next);
    if (next && !commentsLoaded) {
      try {
        const data = await commentService.getCommentsByPost(post.post_id);
        setComments(data);
        setCommentsLoaded(true);
      } catch {
        // silencioso; o usuário pode tentar reabrir
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || sending) return;

    setSending(true);
    try {
      const created = await commentService.addComment({
        fk_post_id: post.post_id,
        comment_content: newComment.trim(),
      });
      setComments((prev) => [...prev, created]);
      setCommentCount((c) => c + 1);
      setNewComment("");
    } catch {
      alert("Não foi possível comentar. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  const handleDeleteComment = async (comment_id) => {
    try {
      await commentService.removeComment(comment_id);
      setComments((prev) => prev.filter((c) => c.comment_id !== comment_id));
      setCommentCount((c) => Math.max(0, c - 1));
    } catch {
      alert("Não foi possível apagar o comentário.");
    }
  };

  return (
    <div className="post-card">
      <div className="post-card-header">
        <img
          className="post-card-avatar"
          src={author.user_photo || "/images/DEFAULTIMAGE.png"}
          alt={author.user_name}
        />
        <div className="post-card-author">
          <span className="post-card-name">{author.user_name || "Usuário"}</span>
          <span className="post-card-date">{formatDateTime(post.post_created_at)}</span>
        </div>

        {canFollow && (
          <button
            className={`post-follow-btn ${post.isFollowingAuthor ? "following" : ""}`}
            onClick={() =>
              onToggleFollow(author.user_id, post.isFollowingAuthor, post.followId)
            }
          >
            {post.isFollowingAuthor ? "Seguindo" : "Seguir"}
          </button>
        )}

        {isAuthor && (
          <button
            className="post-card-delete"
            title="Apagar post"
            onClick={() => onDelete(post.post_id)}
          >
            &times;
          </button>
        )}
      </div>

      <p className="post-card-content">{post.post_content}</p>

      {post.post_media && (
        <div className="post-card-media">
          {isVideo ? (
            <video src={post.post_media} controls />
          ) : (
            <img src={post.post_media} alt="Mídia do post" />
          )}
        </div>
      )}

      <div className="post-card-actions">
        <button
          className={`post-action-btn ${post.isLiked ? "liked" : ""}`}
          onClick={() => onToggleLike(post.post_id, post.isLiked, post.likeId)}
          disabled={!isLoggedIn}
          title={isLoggedIn ? "Curtir" : "Faça login para curtir"}
        >
          {post.isLiked ? "♥" : "♡"} {likeCount}
        </button>

        <button className="post-action-btn" onClick={toggleComments}>
          💬 {commentCount}
        </button>
      </div>

      {showComments && (
        <div className="post-card-comments">
          {comments.length === 0 ? (
            <p className="post-comments-empty">Nenhum comentário ainda.</p>
          ) : (
            comments.map((c) => (
              <div className="post-comment" key={c.comment_id}>
                <img
                  className="post-comment-avatar"
                  src={c.user?.user_photo || "/images/DEFAULTIMAGE.png"}
                  alt={c.user?.user_name}
                />
                <div className="post-comment-body">
                  <span className="post-comment-name">{c.user?.user_name}</span>
                  <span className="post-comment-text">{c.comment_content}</span>
                </div>
                {currentUserId && c.user?.user_id === currentUserId && (
                  <button
                    className="post-comment-delete"
                    title="Apagar comentário"
                    onClick={() => handleDeleteComment(c.comment_id)}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))
          )}

          {isLoggedIn && (
            <form className="post-comment-form" onSubmit={handleAddComment}>
              <input
                type="text"
                className="form-control"
                placeholder="Escreva um comentário..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                maxLength={500}
              />
              <button type="submit" disabled={!newComment.trim() || sending}>
                {sending ? "..." : "Enviar"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default PostCard;
