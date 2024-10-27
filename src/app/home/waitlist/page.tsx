import Image from "next/image";
import bgImg from "../../../../public/images/bg_01.png";
import { JoinWaitlist } from "@/components/JoinWaitlist";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";
import iconImg from "../../../../public/images/icon_02.png"

const WaitlistPage = () => {
    return (
        <section className='pt-[100px] m-0 relative z-0 h-auto min-h-[100vh] overflow-hidden text-white cabinet-grotesk-medium'>
            <div className='w-full flex flex-row justify-start items-center'>
                <div className='px-3 md:px-0 w-full md:w-[1150px] mx-auto flex flex-row justify-start items-center'>
                    <Link
                        href={"/home"}
                        className='flex flex-row justify-center items-center space-x-1 hover:text-[rgba(255,255,255,0.7)]'
                    >
                        <MdOutlineArrowBack size={18} />
                        <span className='text-[14px]'>Go back</span>
                    </Link>
                </div>
            </div>
            <JoinWaitlist />
            <div className="w-full mt-[120px] mb-[30px] flex flex-row space-x-2 justify-center items-end">
                <span className="text-[rgba(255,255,255,0.7)] text-[1rem]">powered by</span>
                <div className="overflow-hidden flex justify-center items-center">
                    <Image src={iconImg} alt="soketlabs_icon" width={120} className="object-contain" />
                </div>
            </div>
            <div className='absolute -z-40 bottom-0 left-0 w-full h-[250px] bg-custom-gradient-2 opacity-50'></div>
            <div className='-z-50 w-full h-full absolute top-0 left-0 bg-black'>
                <Image
                    src={bgImg}
                    alt='background image'
                    className='w-full h-full object-cover object-center'
                />
            </div>
        </section>
    );
};

export default WaitlistPage;
