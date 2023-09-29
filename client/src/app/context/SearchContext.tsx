"use client"
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

interface Task {
  id: number;
  title: string;
  status: "inProgress" | "done";
  // ... any other fields you might have for tasks
}

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  filteredTasks: Task[];
  inProgressTasks: Task[];
  doneTasks: Task[];
}


const SearchContext = createContext<SearchContextProps | undefined>(undefined);
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

interface SearchProviderProps {
  children: React.ReactNode;
}
export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);


  
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  const inProgressTasks = useMemo(() => {
    return filteredTasks.filter(task => task.status === "inProgress");
  }, [filteredTasks]);

  const doneTasks = useMemo(() => {
    return filteredTasks.filter(task => task.status === "done");
  }, [filteredTasks]);


  
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, tasks, setTasks, filteredTasks, inProgressTasks, doneTasks }}>
      {children}
    </SearchContext.Provider>
  );
}
