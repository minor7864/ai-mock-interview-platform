import React from 'react'
import Link  from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import InterviewDialog from '@/components/InterviewDialog'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.action'
import InterviewCard from '@/components/InterviewCard'

const page = async () => {
  const user = await getCurrentUser(); 


  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);


  const pastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;


return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview-Ready with Ai-Powered Pratice & Feedback </h2>
          <p className='text-lg'>Practise on real interview questions & get instant feedback</p>
          <Button asChild className="btn-primary max-sm:w-full">
          <InterviewDialog  />
          </Button> 
        </div>
        <Image src="/robot.png" alt='robo-dude' width={400} height={400} className='max-sm:hidden' />
    </section>
    
    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Interviews</h2>
      <div className="interviews-section">
          {pastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
    </section>

    <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  )
}

export default page