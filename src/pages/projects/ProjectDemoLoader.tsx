// src/pages/projects/ProjectDemoLoader.tsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { projects } from "../../data/projects";

export default function ProjectDemoLoader() {
  const { slug } = useParams<{ slug: string }>();
  const safeSlug = slug || ""; // fallback
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!safeSlug) return;
    let mounted = true;

    const modules = import.meta.glob<{ default: React.ComponentType }>(
      "./**/*.tsx"
    );

    // Reset component asynchronously
    setTimeout(() => {
      if (!mounted) return;
      setLoading(true);
      setNotFound(false);
      setComponent(null);
    }, 0);

    const matchedKey = Object.keys(modules).find((path) =>
      path.toLowerCase().includes(`/${safeSlug.toLowerCase()}/`)
    );

    if (!matchedKey) {
      setTimeout(() => {
        if (!mounted) return;
        setNotFound(true);
        setLoading(false);
      }, 0);
      return;
    }

    modules[matchedKey]()
      .then((mod) => {
        if (!mounted) return;
        setComponent(() => mod.default);
      })
      .catch(() => {
        setTimeout(() => {
          if (!mounted) return;
          setNotFound(true);
        }, 0);
      })
      .finally(() => {
        setTimeout(() => {
          if (!mounted) return;
          setLoading(false);
        }, 0);
      });

    return () => {
      mounted = false;
    };
  }, [safeSlug]);

  const project = projects.find((p) => p.slug === safeSlug);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to={project ? `/project/${project.slug}` : "/"}
          className="text-blue-600 hover:underline"
        >
          ← Back to Project Details
        </Link>
        {project && (
          <h1 className="text-2xl font-bold">{project.name} — Live Demo</h1>
        )}
      </div>

      {loading && <p className="text-gray-600">Loading demo...</p>}

      {notFound && (
        <div className="p-4 border rounded bg-yellow-50">
          <p className="mb-2">
            Demo not found for <strong>{safeSlug}</strong>.
          </p>
          <p className="text-sm text-gray-600">
            Make sure the file exists at{" "}
            <code>
              src/pages/projects/{safeSlug}/{toPascalCase(safeSlug)}.tsx
            </code>
            .
          </p>
        </div>
      )}

      {!loading && Component && (
        <div className="mt-4 border rounded p-4 bg-white shadow-sm">
          <Component />
        </div>
      )}
    </div>
  );
}

function toPascalCase(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
