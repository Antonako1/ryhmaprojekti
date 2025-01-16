interface SeacrhBarProps {
    props: {
        search: string;
        setSearch: (search: string) => void;

        placeholder?: string;
        searchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    }
}

const SearchBar: React.FC<SeacrhBarProps> = ({ props }) => {
    return (
        <form onSubmit={props.searchSubmit}>
            <input
                type="text"
                value={props.search}
                onChange={(e) => props.setSearch(e.target.value)}
                placeholder={props.placeholder}
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;