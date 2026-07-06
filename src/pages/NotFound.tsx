import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground select-none">
      <div className="text-center font-mono">
        <h1 className="mb-4 text-5xl font-extrabold font-display">404</h1>
        <p className="mb-6 text-sm text-muted-foreground font-semibold uppercase tracking-wider">Page Not Found</p>
        <Link to="/" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-soft-sm hover:bg-primary/95 transition-all">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
