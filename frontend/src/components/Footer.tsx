import "bootstrap-icons/font/bootstrap-icons.css";

export function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <span className="text-muted">&copy; IKR 2024</span>
        <div className="d-flex align-items-center">
          <a href="#">
            <i className="bi bi-twitter me-3"></i>
          </a>
          <a href="#">
            <i className="bi bi-facebook me-3"></i>
          </a>
          <a href="#">
            <i className="bi bi-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
