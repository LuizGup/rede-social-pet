import "./PostCard.css";
import { formatDateTime } from "../../../utils/formatters";

function PostCard({ post, currentUserId, onDelete }) {
  const author = post.author || {};
  const isAuthor = currentUserId && author.user_id === currentUserId;

  const isVideo = post.post_media && /\.(mp4|webm|ogg)$/i.test(post.post_media);

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
    </div>
  );
}

export default PostCard;
