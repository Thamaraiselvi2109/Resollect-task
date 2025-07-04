import notfound from '../assets/SearchNotFound.png'

export const NotFound = () =>{
    return(
        <div className="cont my-10 flex flex-col items-center">
            <img src={notfound} alt="notFound" className='w-[400px]'/>
            <p className='texts lg:text-center'>It looks like we can't find any results<br/> that match.</p>
        </div>
    )
}