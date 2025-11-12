import { Link } from "react-router";
import { projects } from "../data/projects";

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        React Projects Tracker
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">S.No</th>
              <th className="px-3 py-2 text-left font-semibold">
                Project Name
              </th>
              <th className="px-3 py-2 text-left font-semibold">Phase</th>
              <th className="px-3 py-2 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, idx) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-3 py-2">{idx + 1}</td>
                <td className="px-3 py-2 text-blue-600 hover:underline">
                  <Link to={`/project/${p.slug}`}>{p.name}</Link>
                </td>
                <td className="px-3 py-2">{p.phase}</td>
                <td className="px-3 py-2">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
