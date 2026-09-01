import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./Search.css";
import searchService from "../../services/searchService";
import { formatDateTime } from "../../utils/formatters";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [term, setTerm] = useState(initialQuery);
  const [results, setResults] = useState({ users: [], posts: [] });
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const isLoggedIn = !!localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
  const me = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_KEY));

  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (!q.trim()) {
      setResults({ users: [], posts: [] });
      setSearched(false);
      return;
    }

    let active = true;
    setLoading(true);
    searchService
      .search(q)
      .then((data) => {
        if (active) {
          setResults(data);
          setSearched(true);
        }
      })
      .catch(() => {
        if (active) setResults({ users: [], posts: [] });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams(term.trim() ? { q: term.trim() } : {});
  };

  const totalResults = results.users.length + results.posts.length;

  return (
    <main className="search-main">
      <div className="custom-title">
        <h1>Buscar</h1>
        <p>Encontre pessoas e publicações. Use # para buscar por hashtag.</p>
      </div>

      <div className="search-container">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nome, texto ou #hashtag..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Buscar
          </button>
        </form>

        {loading ? (
          <p className="search-status">Buscando...</p>
        ) : searched && totalResults === 0 ? (
          <p className="search-status">Nenhum resultado encontrado.</p>
        ) : (
          <>
            {results.users.length > 0 && (
              <section className="search-section">
                <h2 className="search-section-title">Pessoas</h2>
                {results.users.map((u) => (
                  <div className="search-user" key={u.user_id}>
                    <img
                      className="search-user-avatar"
                      src={u.user_photo || "/images/DEFAULTIMAGE.png"}
                      alt={u.user_name}
                    />
                    <div className="search-user-info">
                      <p className="search-user-name">{u.user_name}</p>
                      {u.user_bio && (
                        <p className="search-user-bio">{u.user_bio}</p>
                      )}
                    </div>
                    {isLoggedIn && u.user_id !== me?.user_id && (
                      <Link className="search-chat-btn" to={`/chat/${u.user_id}`}>
                        Conversar
                      </Link>
                    )}
                  </div>
                ))}
              </section>
            )}

            {results.posts.length > 0 && (
              <section className="search-section">
                <h2 className="search-section-title">Publicações</h2>
                {results.posts.map((p) => (
                  <div className="search-post" key={p.post_id}>
                    <div className="search-post-header">
                      <img
                        className="search-post-avatar"
                        src={p.author?.user_photo || "/images/DEFAULTIMAGE.png"}
                        alt={p.author?.user_name}
                      />
                      <div>
                        <span className="search-post-author">
                          {p.author?.user_name}
                        </span>
                        <span className="search-post-date">
                          {formatDateTime(p.post_created_at)}
                        </span>
                      </div>
                    </div>
                    <p className="search-post-content">{p.post_content}</p>
                    <div className="search-post-meta">
                      ♥ {p._count?.likes ?? 0} · 💬 {p._count?.comments ?? 0}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Search;
