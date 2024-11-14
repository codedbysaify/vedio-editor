
export default function Loader() {
  return (
    <div className='flex space-x-2 justify-center items-center  dark:invert'>
    <span className='sr-only'>Loading...</span>
     <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
   <div className='h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
   <div className='h-6 w-6 bg-black rounded-full animate-bounce'></div>
</div>
  );
}