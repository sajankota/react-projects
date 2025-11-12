import { useParams, Link, useNavigate } from "react-router";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const params = useParams() as { slug?: string; id?: string };
  const navigate = useNavigate();

  const raw = params.slug ?? params.id ?? "";
  const maybeId = Number(raw);
  let project =
    !Number.isNaN(maybeId) && raw.trim() !== ""
      ? projects.find((p) => p.id === maybeId)
      : projects.find((p) => p.slug === raw);

  if (!project && raw && !Number.isNaN(maybeId)) {
    const fallbackSlug = projects
      .map((p) => p.slug)
      .find((s) => s === raw || s === String(maybeId));
    if (fallbackSlug) {
      project = projects.find((p) => p.slug === fallbackSlug);
      if (project) navigate(`/project/${project.slug}`, { replace: true });
    }
  }

  if (!project) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <Link
          to="/"
          className="inline-block px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* ✅ Top section with title + buttons side by side */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">{project.name}</h1>

        <div className="flex gap-3">
          <Link
            to="/"
            className="inline-block px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            ← Back to Home
          </Link>

          {project.slug && (
            <a
              href={`/projects/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Live Demo →
            </a>
          )}
        </div>
      </div>

      <div className="space-y-4 border p-4 rounded-lg shadow-sm bg-white">
        <p>
          <span className="font-semibold">Phase:</span> {project.phase}
        </p>

        <p className="flex items-center gap-2">
          <span className="font-semibold">Status:</span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              project.status === "Completed"
                ? "bg-green-100 text-green-700"
                : project.status === "In Progress"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {project.status}
          </span>
        </p>

        <p>
          <span className="font-semibold">Concepts Covered:</span>{" "}
          {project.concepts}
        </p>

        <div>
          <h2 className="font-semibold mb-2">How to Implement:</h2>
          {Array.isArray(project.steps) && project.steps.length > 0 ? (
            <div className="space-y-4 mt-4">
              {project.steps.map((step, i) => (
                <div
                  key={i}
                  className="group relative border-l-4 border-blue-500 bg-white shadow-sm p-4 rounded-md hover:shadow-md transition-all"
                >
                  <div className="absolute -left-[9px] top-5 w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="ml-2">
                    <p className="text-sm text-gray-600 font-semibold mb-1">
                      Step {i + 1}
                    </p>
                    <p className="text-gray-800 leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No steps provided yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
