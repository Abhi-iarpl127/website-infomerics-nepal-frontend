import { Block } from "@/types/common";
import GridIconCards from "@/components/sections/GridIconCards";
import InfoSliderCards from "@/components/sections/InfoSliderCards";
import InfoSliderCards1 from "@/components/sections/InfoSliderCards1";
import MediaCoverage from "@/components/sections/MediaCoverage";
import Seminars from "@/components/sections/Seminars";
import TitleDescriptionBlock from "./sections/TitleDescriptionBlock";
import PostsCardSlider from "./sections/PostsCardSlider";
import Seminars1 from "./sections/Seminars1";

interface BlockRendererProps {
  blocks: Block[];
}


const BlockRenderer = ({ blocks }: BlockRendererProps) => {
    console.log(blocks);
  return (
    <>
    {blocks.map((block: Block, index: number) => {
            if(block.TemplateName){
                switch (block.TemplateName) {
                  case "PostsCardSlider":
                    return <PostsCardSlider key={block.TemplateName + "-" + index} data={block}  />;
                   case "TitleDescription":
                    return <TitleDescriptionBlock key={block.TemplateName + "-" + index} data={block}  />;
                    case "GridIconCards":
                        return <GridIconCards key={block.TemplateName + "-" + index} data={block}  />;
                    case "ImageCardsSlider":
                        return <InfoSliderCards key={block.TemplateName + "-" + index} data={block}  />;
                    case "TextCardsSlider":
                      return <InfoSliderCards1 key={block.TemplateName + "-" + index} data={block}  />;
                    case "GridCards":
                      return <MediaCoverage key={block.TemplateName + "-" + index} data={block}   />;
                    case "YoutubeCardsSlider":
                        return <Seminars1 key={block.TemplateName + "-" + index} data={block}   />;
                    case "SeminarsSlider":
                          return <Seminars key={block.TemplateName + "-" + index} data={block}   />;
                    default:
                      return <div key={block.TemplateName + "-" + index}>Section not found: {block.TemplateName}</div>;
                }
            }   
        })}
    </>
  );
};

export default BlockRenderer;

    