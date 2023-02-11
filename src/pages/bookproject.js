import { BookRequest } from '../components/Request/Request';
import { useParams } from "react-router-dom";

export function Bookproject(){
  let { id } = useParams();
  return(
    <BookRequest id={id}/>
  )
}
