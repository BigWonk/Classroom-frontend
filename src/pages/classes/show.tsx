import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ClassDetails } from "@/types"
import { useShow } from "@refinedev/core";
import {AdvancedImage} from "@cloudinary/react"
import { bannerPhoto } from "@/lib/cloudinary";

export const ClassesShow = () =>
{
    const {query} = useShow<ClassDetails>({resource: "classes"});
    
    const ClassDetails = query.data?.data;
    const {isLoading, isError} = query;
    if(isLoading || isError || !ClassDetails)
    {
        <ShowView className="class-view class-show">
                <ShowViewHeader resource="classes" title="Class Details"></ShowViewHeader>
                <p className="state-message">
                    {isLoading ? "Loading class details..."
                    : isError? "Failed ot load class details.."
                    :"Class details not found"}
                </p>

        </ShowView>
    }
    const teacherName = ClassDetails?.teacher?.name ?? "Unknown";
    const teacherInitials = teacherName.split(" ").filter(Boolean).slice(0,2)
    .map((part) => part[0]?.toUpperCase()).join("");

    const placeholderUrl = `https://placehold.co/600x400?text= ${encodeURIComponent(teacherInitials || 'NA')}`

    
    
    return(
        <ShowView className="class-view class-shiw">
            <ShowViewHeader resource="classes" title ="Class Details"></ShowViewHeader>
            <div className="banner">
                {ClassDetails?.bannerUrl ?<AdvancedImage alt ="Class banner" cldImg={bannerPhoto(ClassDetails.bannerCldPubId, ClassDetails.name)}></AdvancedImage> : <div className="placeholder"></div> } 
            </div>
            <Card className="details-card">
                <div className="details-header">
                    <div>
                        <h1>
                        {ClassDetails?.name}

                        </h1>
                        <p>{ClassDetails?.description}</p>
                    </div>
                    <div>
                        <Badge variant = "outline">{ClassDetails?.capacity} spots</Badge>
                        <Badge variant= {ClassDetails?.status === "active" ? "default" : "secondary" }>
                            {ClassDetails?.status.toUpperCase()}</Badge>
                    </div>

                </div>
                <div className="details-grid">
                    <div className="instructor">
                    <p>Instructor</p>
                    <div>
                        <img src={ClassDetails?.teacher?.image ?? placeholderUrl} alt=""/>
                        <div>
                            <p>{teacherName}</p>
                            <p>{ClassDetails?.teacher?.email}</p>
                        </div>
                    </div>
                    </div>
                    <div className="department">
                        <p>Department</p>
                        <div>
                            <p>{ClassDetails?.department?.name}</p>
                            <p>{ClassDetails?.department?.description}</p>
                        </div>
                    </div>
                </div>
                <Separator></Separator>
                    <div className="subject">
                        <p>Subject</p>
                        <div>
                            <Badge variant="outline">Code: {ClassDetails?.subject?.code}</Badge>
                            <p>{ClassDetails?.subject?.name}</p>
                            <p>{ClassDetails?.subject?.description}</p>
                        </div>
                    </div>
                    <Separator></Separator>
                    <div className="join">
                    <h2>
                        Join Class
                    </h2>
                    <ol>
                        <li>Ask your teacher for invite code</li>
                        <li> Click on "Join Class" button"</li>
                        <li>Paste the code and click join</li>
                    </ol>
                    </div>
                    <Button size="lg" className="w-full">Join Class</Button>
            </Card>
        </ShowView>
    )
}