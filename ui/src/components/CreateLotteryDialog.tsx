import { useState } from 'react';

interface CreateLotteryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (name: string, maxParticipants: number) => void;
}

export function CreateLotteryDialog({ open, onOpenChange, onCreate }: CreateLotteryDialogProps) {
  const [name, setName] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(10);

  const handleSubmit = () => {
    if (name.trim() && maxParticipants > 0 && maxParticipants <= 1000) {
      onCreate(name.trim(), maxParticipants);
      setName('');
      setMaxParticipants(10);
      onOpenChange(false);
    } else {
      alert('Please enter a valid name and max participants (1-1000)');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Lottery</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Lottery Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Max Participants"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
          <button onClick={handleSubmit} className="w-full p-2 bg-blue-500 text-white rounded">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
