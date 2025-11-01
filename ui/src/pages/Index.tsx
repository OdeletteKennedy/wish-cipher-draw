import { useState } from 'react';

export default function Index() {
  const [lotteries, setLotteries] = useState([]);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Encrypted Number Lottery</h1>
    </div>
  );
}
