import React, { useState } from "react";
import { MapPin, ArrowRight, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import StoreCard from "@/components/features/StoreCard";
import { useStoreData } from "@/hooks/useStoreData";

/**
 * Home Page - Màn hình chính (画面No.4)
 * Hiển thị: Hot Picks (carousel 3 ảnh) + Near by you list + All list
 */
const HomePage = () => {
    const { stores } = useStoreData();
    const [currentHotPick, setCurrentHotPick] = useState(0);

    // Lấy top 3 stores có rating cao nhất làm Hot Picks
    const hotPickStores = [...stores]
        .sort((a, b) => b.avg_rating - a.avg_rating)
        .slice(0, 3);

    // Lấy nearby stores (giả lập - lấy 4 store đầu)
    const nearbyStores = stores.slice(0, 4);

    // All stores
    const allStores = stores;

    // Handle navigate to next hot pick
    const nextHotPick = () => {
        setCurrentHotPick((prev) => (prev + 1) % hotPickStores.length);
    };

    const prevHotPick = () => {
        setCurrentHotPick((prev) =>
            prev === 0 ? hotPickStores.length - 1 : prev - 1
        );
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8 md:px-8 lg:px-12 max-w-8xl">
                {/* Hot Pick Section */}
                <section className="mb-12">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-coffee-dark">Hot Pick</h2>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={prevHotPick}
                                className="h-8 w-8"
                            >
                                ←
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={nextHotPick}
                                className="h-8 w-8"
                            >
                                →
                            </Button>
                        </div>
                    </div>

                    {hotPickStores[currentHotPick] && (
                        <Card className="overflow-hidden">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Images Grid */}
                                <div className="grid grid-cols-2 gap-2 p-4">
                                    {hotPickStores[currentHotPick].images.slice(0, 3).map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`overflow-hidden rounded-lg ${idx === 0 ? "col-span-2 aspect-video" : "aspect-square"
                                                }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`${hotPickStores[currentHotPick].name_jp} ${idx + 1}`}
                                                className="h-full w-full object-cover transition-transform hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Info */}
                                <CardContent className="flex flex-col justify-center p-6">
                                    <h3 className="mb-3 text-2xl font-bold">
                                        {hotPickStores[currentHotPick].name_jp}
                                    </h3>
                                    <p className="mb-4 text-muted-foreground">
                                        {hotPickStores[currentHotPick].description_jp}
                                    </p>
                                    <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        <span>{hotPickStores[currentHotPick].address_jp}</span>
                                    </div>
                                    <Link to={`/store/${hotPickStores[currentHotPick].id}`}>
                                        <Button className="w-full sm:w-auto">
                                            詳細を見る
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </div>
                        </Card>
                    )}
                </section>

                {/* Near by you Section */}
                <section className="mb-12">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-coffee-dark">Near by you</h2>
                        <Link to="/map">
                            <Button variant="outline">
                                <Map className="mr-2 h-4 w-4" />
                                地図を見る
                            </Button>
                        </Link>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {nearbyStores.map((store) => (
                            <StoreCard key={store.id} store={store} />
                        ))}
                    </div>
                </section>

                {/* All List Section */}
                <section>
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-coffee-dark">All list</h2>
                        <Link to="/search">
                            <Button variant="outline">
                                すべて見る
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {allStores.map((store) => (
                            <StoreCard key={store.id} store={store} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
