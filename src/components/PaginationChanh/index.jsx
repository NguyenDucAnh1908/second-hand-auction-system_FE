import React, {useState} from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const getItemProps = (index) => ({
        variant: currentPage === index ? "filled" : "text",
        color: "green",
        onClick: () => onPageChange(index - 1), // Trừ 1 vì currentPage bắt đầu từ 0
        className: "rounded-full",
    });

    const next = () => {
        if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
    };

    const prev = () => {
        if (currentPage > 0) onPageChange(currentPage - 1); // Đảm bảo không xuống dưới 0
    };

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={prev}
                disabled={currentPage === 0} // Disable Previous khi ở trang 0
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <IconButton key={i + 1} {...getItemProps(i + 1)}>
                        {i + 1}
                    </IconButton>
                ))}
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={next}
                disabled={currentPage === totalPages - 1} // Disable Next khi ở trang cuối
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}
