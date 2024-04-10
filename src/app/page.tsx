

"use client"


import React, { useEffect, useState } from 'react';
import { fetchGames } from '../services/gameApi';
import SearchBar from '../app/SearchBar';
import PlatformSorterting from '../app/PlatformSorting';

interface Game {
  title: string;
  platform: string;
  score: number;
  genre: string;
  editors_choice: boolean;
}

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const gamesData = await fetchGames();
      if (gamesData) {
        setGames(gamesData);
        setFilteredGames(gamesData);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = games.filter(game =>
      game && game.title && game.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  const handleSort = (sortedGames: Game[]) => {
    setFilteredGames(sortedGames);
  };

  const handleReset = () => {
    setFilteredGames(games); // original list
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
      <div>
        <h1 className="flex justify-center mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Games</h1>
        <SearchBar onSearch={handleSearch} />
        <PlatformSorterting games={filteredGames} onSort={handleSort} onReset={handleReset} />
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-400 sm:p-8 sm:text-2xl mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Platform</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Genre</th>
                <th className="px-4 py-2">Editors Choice</th>
              </tr>
            </thead>
            <tbody>
              {filteredGames.map((game, index) => (
                <tr key={index} className={index % 3 === 0 ? 'bg-gray-200' : ''}>
                  <td className="border px-4 py-2">{game.title}</td>
                  <td className="border px-4 py-2">{game.platform}</td>
                  <td className="border px-4 py-2">{game.score}</td>
                  <td className="border px-4 py-2">{game.genre}</td>
                  <td className="border px-4 py-2">{game.editors_choice ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Home;
