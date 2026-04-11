import { Gravity, MatterBody } from "@/components/ui/gravity";
// import {services} from "@/lib/data";

const services = [
  { id: 1, title: "Website Development" },
  { id: 2, title: "Software Development" },
  { id: 3, title: "Mobile App Development" },
  { id: 4, title: "AI-Powered Software" },
  { id: 5 , title: "E-commerce Solutions" },
  { id: 6 , title: "Wordpress Solutions" },

];
const ListOfServices = () => {
 
  
  const colors = [
    "#0015ff", // Blue
    "#E794DA", // Pink
    "#1f464d", // Dark Teal
    "#ff5941", // Orange-Red
    "#ffd726"  // Yellow
  ];

  return (
    <div className="w-full h-[350px] min-h-[300px] flex flex-col relative font-azeretMono overflow-hidden">
     
      <Gravity gravity={{ x: 0, y: 1 }} className="w-fit h-fit">
        {services.map((service, index) => (
          <MatterBody
            key={service.id}
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x={`${20 + (index * 10)}%`}
            y={`${10 + (index * 10)}%`}
            angle={index * 5}
          >
            <div
              className="text-xl sm:text-xl md:text-2xl text-white rounded-full hover:cursor-grab px-8 py-4"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              {service.title}
            </div>
          </MatterBody>
        ))}
      </Gravity>
    </div>
  );
};

export default ListOfServices;