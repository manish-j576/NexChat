export default function SearchedUser(userDetails : any){



    
    return (
      <div className="mt-2 bg-blue-400 w-full p-2 justify-center ">
        <div className="flex border-2 bg-yellow-300 gap-1 justify-between items-center h-10">
          <div className="rounded-full bg-red-700 h-full w-1/6 flex justify-center items-center overflow-hidden">
            Imag
          </div>
          <div className="w-[80%] bg-blue-900 h-full justify-center items-center">
            Name         
            </div>
             <button className="rounded-lg bg-red-700 h-full w-1/6 flex justify-center items-center overflow-hidden">
            send
          </button>
        </div>
      </div>
    );
}