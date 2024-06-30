import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - BD Photography`;

    }, [title])
}

export default useTitle;




