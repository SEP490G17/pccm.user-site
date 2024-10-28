import { Pagination as AntPagination } from 'antd';

interface PaginationProps {
    currentPage: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, pageSize, total, onPageChange }) => {
    return (
        <AntPagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={onPageChange}
            className="pagination"
        />
    );
};

export default Pagination;
