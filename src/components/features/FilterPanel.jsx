import React from "react";
import { SlidersHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SERVICE_OPTIONS } from "@/mocks/data/constants";

/**
 * Filter Panel Component - Panel lọc và sắp xếp quán cà phê
 * @param {Array} selectedServices - Danh sách services đã chọn
 * @param {Function} onServicesChange - Callback khi thay đổi services
 * @param {string} sortBy - Tiêu chí sắp xếp hiện tại
 * @param {Function} onSortChange - Callback khi thay đổi sort
 * @param {number} minRating - Rating tối thiểu
 * @param {Function} onMinRatingChange - Callback khi thay đổi rating
 */
const FilterPanel = ({
    selectedServices = [],
    onServicesChange,
    sortBy = "rating",
    onSortChange,
    minRating = 0,
    onMinRatingChange,
}) => {
    // Xử lý toggle service
    const handleServiceToggle = (service) => {
        const newServices = selectedServices.includes(service)
            ? selectedServices.filter((s) => s !== service)
            : [...selectedServices, service];
        onServicesChange(newServices);
    };

    // Reset filters
    const handleReset = () => {
        onServicesChange([]);
        onMinRatingChange(0);
        onSortChange("rating");
    };

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Rating Filter */}
            <div>
                <Label className="mb-3 flex items-center gap-2 text-base font-semibold">
                    <Star className="h-4 w-4" />
                    評価
                </Label>
                <Select
                    value={minRating.toString()}
                    onValueChange={(value) => onMinRatingChange(Number(value))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="評価を選択" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">すべて</SelectItem>
                        <SelectItem value="4">4.0以上</SelectItem>
                        <SelectItem value="4.5">4.5以上</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Services Filter */}
            <div>
                <Label className="mb-3 block text-base font-semibold">サービス</Label>
                <div className="space-y-3">
                    {SERVICE_OPTIONS.map((service) => (
                        <div key={service} className="flex items-center gap-2">
                            <Checkbox
                                id={service}
                                checked={selectedServices.includes(service)}
                                onCheckedChange={() => handleServiceToggle(service)}
                            />
                            <Label
                                htmlFor={service}
                                className="cursor-pointer text-sm font-normal"
                            >
                                {service}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sort */}
            <div>
                <Label className="mb-3 block text-base font-semibold">並び替え</Label>
                <Select value={sortBy} onValueChange={onSortChange}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rating">評価順</SelectItem>
                        <SelectItem value="reviews">レビュー数順</SelectItem>
                        <SelectItem value="name">名前順</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Reset Button */}
            <Button variant="outline" className="w-full" onClick={handleReset}>
                リセット
            </Button>
        </div>
    );

    return (
        <>
            {/* Desktop Version */}
            <div className="hidden lg:block">
                <div className="sticky top-20 rounded-lg border bg-card p-6">
                    <div className="mb-4 flex items-center gap-2">
                        <SlidersHorizontal className="h-5 w-5" />
                        <h2 className="text-lg font-semibold">フィルター</h2>
                    </div>
                    <FilterContent />
                </div>
            </div>

            {/* Mobile Version */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        フィルター
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                    <SheetHeader>
                        <SheetTitle>フィルター</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                        <FilterContent />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default FilterPanel;
