import React, { useState } from "react";
import { MapPin, ArrowLeft, List } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import StoreCard from "@/components/features/StoreCard";
import FilterPanel from "@/components/features/FilterPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useStoreData } from "@/hooks/useStoreData";

/**
 * Map Page - Màn hình bản đồ (画面No.6)
 * Note: Đây là mock UI vì không tích hợp Google Maps API thật
 * Hiển thị: Map placeholder + Sidebar với list quán
 */
const MapPage = () => {
    const { stores, filterStores, sortStores } = useStoreData();
    const [selectedStore, setSelectedStore] = useState(null);
    const [showList, setShowList] = useState(true);

    // Filter states
    const [selectedServices, setSelectedServices] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState("rating");

    // Filtered stores
    const filteredStores = sortStores(
        filterStores(minRating, selectedServices),
        sortBy
    );

    return (
        <div className="flex h-screen flex-col">
            <Header />

            <div className="relative flex flex-1 overflow-hidden">
                {/* Map Container */}
                <div className="relative flex-1">
                    {/* Mock Map - Placeholder */}
                    <div className="h-full w-full bg-gradient-to-br from-accent to-secondary">
                        {/* Map Controls */}
                        <div className="absolute left-4 top-4 z-10 flex gap-2">
                            <Link to="/">
                                <Button variant="secondary" size="icon">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="lg:hidden"
                                onClick={() => setShowList(!showList)}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Mock Map Content */}
                        <div className="flex h-full items-center justify-center">
                            <div className="text-center">
                                <MapPin className="mx-auto mb-4 h-16 w-16 text-primary" />
                                <p className="text-lg font-semibold text-muted-foreground">
                                    地図ビュー (開発中)
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    実際のアプリではGoogle Mapsが表示されます
                                </p>
                            </div>
                        </div>

                        {/* Mock Markers Info */}
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
                            {filteredStores.slice(0, 5).map((store) => (
                                <Card
                                    key={store.id}
                                    className="flex-shrink-0 cursor-pointer transition-all hover:shadow-lg"
                                    onClick={() => setSelectedStore(store)}
                                >
                                    <CardContent className="flex items-center gap-3 p-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            <MapPin className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{store.name_jp}</p>
                                            <p className="text-xs text-muted-foreground">
                                                評価: {store.avg_rating} ★
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Store List */}
                <div
                    className={`absolute right-0 top-0 h-full w-full bg-background transition-transform lg:relative lg:w-96 lg:translate-x-0 ${showList ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex h-full flex-col border-l">
                        {/* Header */}
                        <div className="border-b p-4">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold">
                                    カフェ一覧 ({filteredStores.length})
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="lg:hidden"
                                    onClick={() => setShowList(false)}
                                >
                                    ✕
                                </Button>
                            </div>

                            {/* Filter Panel (Mobile) */}
                            <FilterPanel
                                selectedServices={selectedServices}
                                onServicesChange={setSelectedServices}
                                sortBy={sortBy}
                                onSortChange={setSortBy}
                                minRating={minRating}
                                onMinRatingChange={setMinRating}
                            />
                        </div>

                        {/* Store List */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-3">
                                {filteredStores.map((store) => (
                                    <StoreCard key={store.id} store={store} compact />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapPage;
