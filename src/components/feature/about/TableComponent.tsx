import Image from "next/image";

const size = 300;
const classDefaultSetting: string = "border border-slate-700 px-4 py-2";

const imageArray: string[] = [
    "image-1.png", 
    "image-2.png",
    "image-3.png",
    "image-4.png",
    "image-5.png",
    "image-6.png",
    "image-7.png",
    "image-8.png",
    "image-9.png",
    "image-10.png"
];

function generateImageSrc(value: string) {
    const basePath = "/testing-01/";
    return basePath + value;
}

function ImageComponent({ imageSrc }: { imageSrc: string }) {
  return (
    <td className={classDefaultSetting}> <Image src={generateImageSrc(imageSrc)} alt="Image" width={size} height={size} /></td>
  );
}

function ImageGrid() { 
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <table className="table-auto border-collapse border border-slate-500">
            <tbody>
            <tr>
                <ImageComponent imageSrc={imageArray[0]} />
                <ImageComponent imageSrc={imageArray[1]} />
                <ImageComponent imageSrc={imageArray[2]} />
                <ImageComponent imageSrc={imageArray[3]} />
                <ImageComponent imageSrc={imageArray[4]} />
            </tr>
            <tr>
                <ImageComponent imageSrc={imageArray[5]} />
                <ImageComponent imageSrc={imageArray[6]} />
                <ImageComponent imageSrc={imageArray[7]} />
                <ImageComponent imageSrc={imageArray[8]} />
                <ImageComponent imageSrc={imageArray[9]} />
            </tr>
            </tbody>
        </table>
        </div>

    )
}


export const TableComponent = {
    ImageGrid,
    ImageComponent
}