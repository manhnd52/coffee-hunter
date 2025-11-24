import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import StoreCard from "@/components/features/StoreCard";
import FilterPanel from "@/components/features/FilterPanel";
import { useStoreData } from "@/hooks/useStoreData";

/**
 * Search Result Page - Màn hình kết quả tìm kiếm (画面No.5)
 * Hiển thị: Filter sidebar + List kết quả + Sort options
 */
const SearchResultPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const { filterStores, sortStores, searchStores } = useStoreData();

    // Filter states
    const [selectedServices, setSelectedServices] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState("rating");

    // Filtered and sorted results
    const [displayStores, setDisplayStores] = useState([]);

    // Update results when filters change
    useEffect(() => {
        let results = query ? searchStores(query) : filterStores(0, []);

        // Apply filters
        results = filterStores(minRating, selectedServices);

        // Apply sort
        results = sortStores(results, sortBy);

        setDisplayStores(results);
    }, [query, selectedServices, minRating, sortBy]);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8 md:px-8 lg:px-12 max-w-8xl">
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-coffee-dark">
                        {query ? `"${query}" の検索結果` : "カフェ一覧"}
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        {displayStores.length}件のカフェが見つかりました
                    </p>
                </div>

                <div className="flex gap-8">
                    {/* Filter Panel */}
                    <aside className="w-80 flex-shrink-0">
                        <FilterPanel
                            selectedServices={selectedServices}
                            onServicesChange={setSelectedServices}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                            minRating={minRating}
                            onMinRatingChange={setMinRating}
                        />
                    </aside>

                    {/* Results Grid */}
                    <div className="flex-1">
                        {displayStores.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {displayStores.map((store) => (
                                    <StoreCard key={store.id} store={store} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed">
                                <div className="text-center">
                                    <p className="text-lg font-medium text-muted-foreground">
                                        条件に合うカフェが見つかりませんでした
                                    </p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        フィルターを変更してもう一度お試しください
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SearchResultPage;
