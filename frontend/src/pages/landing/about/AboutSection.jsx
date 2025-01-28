import Sanjuan from '../../../assets/about-img.jpg'

export default function About() {
    return (
        <div className='grid grid-cols-2 lg:px-[4.5rem] lg:pt-40'>
            <section className=''>   
                <img src={Sanjuan} alt="sanjuan-munisipyo" width={585}/>
            </section>
            <section className='pt-40 pl-6 font-semibold'>
                <div>
                    <h2 className='font-extrabold text-red-700 pb-2'>About</h2>
                </div>
                <div>
                    <p className='leading-[180%]'>The City Environment and Natural Resources Office (CENRO) supports the Sangguniang Panlungsod and the city mayor in ensuring the delivery of environmental services and facilities, 
                        as mandated by the Local Government Code under section 17 of 1991 and Republic Act No. 9388. 
                        CENRO develops and implements environment-related programs and projects, and coordinates with government and non-government organizations to prevent and control land, air, 
                        and water pollution. 
                    </p>
                </div>
            </section>
        </div>
    )
}