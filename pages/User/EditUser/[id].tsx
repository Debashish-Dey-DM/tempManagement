import React from 'react'
import { useRouter } from 'next/router';

const EditUser = () => {
    const router = useRouter();
    const id = router.query.id;
    console.log(Number(id));
    
  return (
    <div>{id}</div>
  )
}
export default EditUser;
