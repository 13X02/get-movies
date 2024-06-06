const CarouselCard = ({ title, description, image,link}) => () => {    
    return(
        
        <div className='flex min-w-screen h-96 bg-red flex-col items-center justify-center'>
            <img src={image} className='h-96 w-96 rounded-md' />
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-lg'>{description}</p>
            <button className='bg-blue-500 text-white p-2 rounded-md mt-2'>Watch Now</button>
        </div>
        
    )
}

export default CarouselCard;