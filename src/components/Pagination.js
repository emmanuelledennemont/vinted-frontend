const Pagination =({cardsPerPage, totalCards}) => {

const pageNumbers = [];

for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage ); i++) {
    pageNumbers.push(i);
}

return (
    <>
    
    </>
)
}

export default Pagination;