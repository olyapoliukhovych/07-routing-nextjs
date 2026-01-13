import axios from 'axios';
import type { Note } from '@/types/note';

const noteApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

noteApi.interceptors.request.use(config => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number = 1,
  search: string = '',
  tag?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page: page || 1,
    search: search || '',
    perPage: 12,
  };

  if (tag && tag !== 'all') {
    params.tag = tag;
  }

  const { data } = await noteApi.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await noteApi.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  noteContent: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const { data } = await noteApi.post<Note>('/notes', noteContent);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await noteApi.delete<Note>(`/notes/${id}`);
  return data;
};
