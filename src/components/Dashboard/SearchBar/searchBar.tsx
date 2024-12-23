import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuery } from "../../../store/reducers/searchSlice";
import { RootState } from "@/store/store";
import { TreeNode } from "../FileTree/utils/fileTreeInterface";
import { fetchFoldersRequest } from "@/store/reducers/folderSlice";

const SearchInput = () => {
  const dispatch = useDispatch();
  const { query, results, loading } = useSelector((state:RootState) => state.search);
  const handleOptionClick = useCallback((id: string) => {
    dispatch(fetchFoldersRequest(id));
    dispatch(setQuery(""));
  }, [dispatch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  }, [dispatch]);

  return (
    <div className=" mb-5 w-60 mx-6 h-15 relative">
      Menu
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {loading && <p>Loading...</p>}
      {!loading && (
        <ul className="absolute left-0 top-full w-full bg-white border border-gray-300 rounded shadow-lg z-10">
          {results?.length > 0 ? (
            results?.map((result:TreeNode) => (
              <li key={result?.id}               
                className="p-2 hover:bg-gray-100 cursor-pointer"
                //@ts-ignore
                onClick={()=> {handleOptionClick(result?.id)}}
              >
                {result?.name}
              </li>
            ))
          ) : (
            query && <p>No results found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
