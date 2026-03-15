import { useEffect, useState } from "react";

export function useEMGData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(-200), {
          time: Date.now(),
          value: Math.sin(Date.now() / 80) * 0.6 + (Math.random() * 0.6 - 0.3)
        }];
        return newData;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return data;
}

