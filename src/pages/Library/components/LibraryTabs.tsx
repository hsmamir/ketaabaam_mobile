import React, { useState } from 'react';
import { LibraryBook } from '../../../types';
import BookList from '../../../components/BookList';

interface Props {
  currentlyReading: LibraryBook[];
  wantToRead: LibraryBook[];
  finished: LibraryBook[];
}

export default function LibraryTabs({ currentlyReading, wantToRead, finished }: Props) {
  const tabs = ['دارم میخونم', 'میخوام بخونم', 'خوندم'];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const getBooksForActiveTab = () => {
    switch (activeTab) {
      case 'دارم میخونم':
        return currentlyReading;
      case 'میخوام بخونم':
        return wantToRead;
      case 'خوندم':
        return finished;
      default:
        return [];
    }
  };

  return (
    <div className="px-4">
      <div className="flex border-b mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 -mb-px border-b-2 ${
              activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <BookList title={activeTab} books={getBooksForActiveTab()} />
    </div>
  );
}