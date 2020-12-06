import React from 'react';
import { useSelector, useDispatch} from "react-redux";
import {
    selectCount,
    fetchDummy,
    selectUsername,
    fetchJson
} from "./features/cutomCounter/customCounterSlice";

const ReduxAsync = () => {
    const count = useSelector(selectCount);
    const username = useSelector(selectUsername);
    const dispatch = useDispatch()
    return (
        <div>
            <span data-testid="count-value">{count}</span>
            <button onClick={()=> dispatch(fetchDummy(5))}>FetchDummy</button>
            {username && <h1>{username}</h1>}
            <button onClick={()=> dispatch(fetchJson())}>FetchJson</button>
        </div>
    )
}

export default ReduxAsync
