import type { Notification } from '../../types/notification';

export const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 1,
        user_id: 1, // Giả sử gửi cho user 1
        title_jp: "新しいカフェがオープンしました",
        content_jp: "タイホー区に新しいカフェ「グリーンガーデン」がオープンしました。ぜひチェックしてください！",
        is_read: false,
        created_at: "2024-11-20T08:00:00",
    },
    {
        id: 2,
        user_id: 1,
        title_jp: "週末限定セール",
        content_jp: "お気に入りのカフェで週末限定20%オフセールを開催中です。",
        is_read: false,
        created_at: "2024-11-19T10:30:00",
    },
    {
        id: 3,
        user_id: 1,
        title_jp: "レビュー投稿ありがとうございます",
        content_jp: "あなたのレビューが承認されました。他のユーザーの参考になります！",
        is_read: true,
        created_at: "2024-11-18T14:20:00",
    },
];
