import { useState } from "react";
import "./CreatePostBox.css";

function CreatePostBox({ onCreate }) {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || submitting) return;

    setSubmitting(true);
    try {
      await onCreate({
        post_content: content.trim(),
        post_media: media.trim() || null
      });
      setContent("");
      setMedia("");
    } catch {
      alert("Não foi possível publicar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="create-post-box" onSubmit={handleSubmit}>
      <textarea
        className="create-post-textarea"
        placeholder="No que você está pensando sobre seu pet?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        maxLength={1000}
      />

      <input
        type="text"
        className="form-control create-post-media"
        placeholder="URL de imagem ou vídeo (opcional)"
        value={media}
        onChange={(e) => setMedia(e.target.value)}
      />

      <div className="create-post-actions">
        <button
          type="submit"
          className="create-post-btn"
          disabled={!content.trim() || submitting}
        >
          {submitting ? "Publicando..." : "Publicar"}
        </button>
      </div>
    </form>
  );
}

export default CreatePostBox;
