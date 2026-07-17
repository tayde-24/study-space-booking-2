export default function StatCard({ title, value, icon, color = "bg-blue-200" }) {
    return (
        <div className="bg-white shadow-sm rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">  
            <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center m-auto text-white text-4xl mb-3`}>{icon}</div>
            <h2 className="text-gray-500 text-sm  uppercase tracking-wide">{title}</h2>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    );
}