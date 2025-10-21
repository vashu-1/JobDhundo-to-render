import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge.jsx";
import React from "react";
import { Button } from "./ui/button.jsx";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar.jsx";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const jobId = job?._id;
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo === 0
      ? "Today"
      : `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  };
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt)}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-0 rounded-full w-10 h-10 flex items-center justify-center">
          <Avatar className="w-8 h-8">
            <AvatarImage
              className="w-8 h-8 object-cover rounded-full"
              src={job?.company?.logo}
              alt="Company Logo"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => {
            if (jobId) {
              navigate(`/description/${jobId}`);
            } else {
              // Optionally show an error or do nothing
            }
          }}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
