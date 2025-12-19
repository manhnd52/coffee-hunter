import { useState } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import ProfileInfo from "@/components/features/profile/ProfileInfo";
import type { User as UserType } from "@/types/user";
import { MOCK_USERS } from "@/mocks/data/users";

const UserProfilePage = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<UserType | null>(currentUser);

    if (!currentUser) {
        navigate("/login");
        return null;
    }

    const handleUpdateField = (field: keyof UserType, value: string) => {
        if (userData) {
            setUserData({ ...userData, [field]: value });
        }
    };

    const handleSave = () => {
        if (isEditing) {
            if (!userData?.name.trim()) {
                toast({
                    variant: "destructive",
                    title: "入力エラー",
                    description: "名前を入力してください。",
                });
                return;
            }

            // Lấy dữ liệu từ localStorage, nếu không có thì lấy từ file gốc MOCK_USERS
            const rawSavedUsers = localStorage.getItem("mockUsers");
            const currentUsersList = rawSavedUsers
                ? JSON.parse(rawSavedUsers)
                : [...MOCK_USERS]; // Fallback về dữ liệu gốc nếu Storage trống

            // Cập nhật hoặc thêm mới user vào danh sách
            const userIndex = currentUsersList.findIndex((u: UserType) => u.id === userData?.id);

            let updatedUsers;
            if (userIndex !== -1) {
                // Nếu tìm thấy user, cập nhật thông tin
                updatedUsers = [...currentUsersList];
                updatedUsers[userIndex] = userData;
            } else {
                // Nếu không thấy (trường hợp hiếm), thêm mới vào
                updatedUsers = [...currentUsersList, userData];
            }

            // Lưu lại vào localStorage
            localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));

            toast({
                title: "保存完了",
                description: "プロフィール情報が更新されました。",
            });
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            {/* 1. Chiều cao main cao hết màn hình (trừ header 64px) */}
            <main className="flex-1 container mx-auto py-6 px-4 flex flex-col">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 border rounded-lg overflow-hidden bg-card shadow-sm">
                    {/* Sidebar */}
                    <div className="md:col-span-1 border-r p-6 flex flex-col items-center bg-muted/5">
                        <div className="w-32 h-32 border-2 flex items-center justify-center bg-white overflow-hidden mb-6">
                            {userData?.avatar_url ? (
                                <img src={userData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-muted-foreground italic">Image</span>
                            )}
                        </div>

                        <div className="w-full space-y-2">
                            <Button variant="outline" className="w-full justify-center bg-accent">詳細情報</Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-center border"
                                onClick={() => navigate("/favorites")}
                            >
                                お気に入りリスト
                            </Button>
                        </div>

                        {/* 2. Nút logout ở cuối sidebar, nằm giữa */}
                        <div className="mt-auto w-full flex justify-center pb-4">
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-lg font-bold hover:text-destructive transition-colors"
                            >
                                ログアウト <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3 p-8 relative flex flex-col bg-white">
                        <ProfileInfo
                            user={userData || currentUser}
                            isEditing={isEditing}
                            onUpdate={handleUpdateField}
                        />

                        <div className="absolute bottom-8 right-8">
                            <Button
                                onClick={handleSave}
                                variant="outline"
                                className="border-2 px-8 h-12 text-lg font-bold shadow-md hover:bg-accent"
                            >
                                {isEditing ? "セーブ" : "エディット"}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserProfilePage;
