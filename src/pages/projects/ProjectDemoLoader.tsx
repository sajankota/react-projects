// src/pages/projects/ProjectDemoLoader.tsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { projects } from "../../data/projects";

export default function ProjectDemoLoader() {
  const { slug } = useParams() as { slug?: string };
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let mounted = true;
    const normalizedSlug =
      slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase(); // Capitalize first letter

    // Import all project demo components dynamically
    const modules = import.meta.glob<{ default: React.ComponentType }>(
      "./**/*.tsx"
    );

    // Find the matching file (case-insensitive)
    const matchedKey = Object.keys(modules).find((path) =>
      path.toLowerCase().endsWith(`/${normalizedSlug.toLowerCase()}.tsx`)
    );

    if (!matchedKey) {
      // Only set after render cycle
      queueMicrotask(() => {
        if (mounted) {
          setNotFound(true);
          setLoading(false);
        }
      });
      return;
    }

    modules[matchedKey]()
      .then((mod) => {
        if (!mounted) return;
        queueMicrotask(() => {
          setComponent(() => mod.default);
          setLoading(false);
        });
      })
      .catch(() => {
        if (!mounted) return;
        queueMicrotask(() => {
          setNotFound(true);
          setLoading(false);
        });
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  const project = projects.find((p) => p.slug === slug);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <Link
          to={project ? `/project/${project.id}` : "/"}
          className="text-blue-600 hover:underline"
        >
          ← Back to Project Details
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">
        {project ? `${project.name} — Live Demo` : "Live Demo"}
      </h1>

      {loading && <p className="text-gray-600">Loading demo...</p>}

      {notFound && (
        <div className="p-4 border rounded bg-yellow-50">
          <p className="mb-2">
            Demo not found for <strong>{slug}</strong>.
          </p>
          <p className="text-sm text-gray-600">
            Make sure the file exists at{" "}
            <code>src/pages/projects/{slug}.tsx</code> (case-sensitive).
          </p>
        </div>
      )}

      {!loading && Component && (
        <div className="mt-4 border rounded p-4 bg-white">
          <Component />
        </div>
      )}
    </div>
  );
}
