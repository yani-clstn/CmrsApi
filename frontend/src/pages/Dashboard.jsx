import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function Dashboard({ onLogout }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 0,
    startTime: '',
    endTime: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await API.get('/Rooms');
      setRooms(res.data);
    } catch (err) {
      console.error('Error fetching rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await API.post('/Reservations', {
        roomId: selectedRoom.id,
        title: formData.title,
        type: parseInt(formData.type),
        startTime: formData.startTime,
        endTime: formData.endTime
      });

      setMessage('Reservation created successfully!');
      setSelectedRoom(null);
      setFormData({ title: '', type: 0, startTime: '', endTime: '' });
      fetchRooms();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error creating reservation.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Top Bar */}
        <header className="flex justify-between items-center pb-6 border-b border-slate-800 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Classroom Dashboard</h1>
            <p className="text-sm text-slate-400">View room availability and request reservations</p>
          </div>
          <button 
            onClick={onLogout} 
            className="px-4 py-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/20 text-sm font-medium rounded-xl transition-colors"
          >
            Sign Out
          </button>
        </header>

        {/* Message Banner */}
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
            {message}
          </div>
        )}

        {/* Room Grid */}
        {loading ? (
          <div className="text-slate-400 text-sm">Loading classrooms...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-indigo-400">
                      {room.name || room.roomNumber || `Room #${room.id}`}
                    </h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      room.isOccupied ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {room.isOccupied ? 'Occupied' : 'Available'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-6">Capacity: <span className="text-white font-medium">{room.capacity} students</span></p>
                </div>

                <button 
                  onClick={() => setSelectedRoom(room)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition-colors shadow-md shadow-indigo-600/10"
                >
                  Book Room
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Booking Modal */}
        {selectedRoom && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">
                Reserve {selectedRoom.name || selectedRoom.roomNumber || `Room #${selectedRoom.id}`}
              </h3>

              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Purpose / Title</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                    placeholder="e.g. COSC 101 Lecture"
                    required 
                    className="w-full px-3.5 py-2 bg-slate-800/60 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Event Type</label>
                  <select 
                    value={formData.type} 
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800/60 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value={0}>Lecture</option>
                    <option value={1}>Event</option>
                    <option value={2}>Exam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Start Time</label>
                  <input 
                    type="datetime-local" 
                    value={formData.startTime} 
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} 
                    required 
                    className="w-full px-3.5 py-2 bg-slate-800/60 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">End Time</label>
                  <input 
                    type="datetime-local" 
                    value={formData.endTime} 
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} 
                    required 
                    className="w-full px-3.5 py-2 bg-slate-800/60 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setSelectedRoom(null)}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition-colors shadow-md shadow-indigo-600/20"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}