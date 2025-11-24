import type { User } from '../../types/user';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "田中太郎",
    email: "tanaka@example.com",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka",
    birthday: "1990-05-15",
    gender: "male",
  },
  {
    id: 2,
    name: "佐藤花子",
    email: "sato@example.com",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sato",
    birthday: "1992-08-20",
    gender: "female",
  },
  {
    id: 3,
    name: "鈴木一郎",
    email: "suzuki@example.com",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=suzuki",
    birthday: "1988-03-10",
    gender: "male",
  },
];

// Giả lập danh sách ID quán yêu thích (User ID 1)
export const MOCK_FAVORITES: number[] = [1, 3, 5];
