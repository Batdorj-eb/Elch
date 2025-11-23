// app/privacy-policy/page.tsx

import React from 'react';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import BreakingNewsBanner from '@/components/news/BreakingNewsBanner';
import { getBreakingNews } from '@/lib/api';

export const metadata = {
  title: 'Нууцын бодлого - ELCH News',
  description: 'ELCH News нууцын бодлого болон үйлчилгээний нөхцөл',
};

export default async function PrivacyPolicyPage() {
  const breakingNews = await getBreakingNews();

  return (
    <div className="min-h-screen bg-[#FFF1E5]">
      <header>
        <BreakingNewsBanner articles={breakingNews} />
        <Header />
        <NavigationBar />
      </header>

      <main className="max-w-[1325px] mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Page Title */}
        <div className="flex mb-8 md:mb-12 justify-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#2F2F2F] text-center mb-4 pb-4 border-b-4 border-[#FF3336] inline-block">
            Нууцын бодлого
          </h1>
        </div>

        {/* Content Section */}
        <div className=" mx-auto  shadow-sm p-6 md:p-8 lg:p-10">
          {/* Introduction */}
          <div className="mb-8 text-[#2F2F2F]">
            <p className="text-[11px] lg:text-[18px] md:text-base leading-relaxed text-zinc-600">
              The below policy examples are intended to serve as guidance for Wayne State University policy owner(s)/co-owners, when drafting policy statements for new or revised policies.
            </p>
          </div>

          {/* Example 1 */}
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-bold text-[#2F2F2F] mb-4">
              Example 1 (For presidential policies):
            </h2>
            <p className="text-[11px] lg:text-[18px] md:text-base leading-relaxed text-[#2F2F2F] mb-4">
              The purpose of this University Policy is to clarify rulemaking procedures from the Office of the President, and the procedure for the development, review and approval of policies initiated at other levels or by other bodies in the University. The decision-making authority upon which this University Policy is based follows existing Statutes and actions of the Board of Governors.
            </p>
          </div>

          {/* Example 2 */}
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-bold text-[#2F2F2F] mb-4">
              Example 2 (For administrative regulations):
            </h2>
            <p className="text-[11px] lg:text-[18px] md:text-base leading-relaxed text-[#2F2F2F] mb-4">
              This policy has been established to ensure consistency of all external advertisement of university positions. External advertisements are supplemental to internal postings and recruitment/hiring policy requirements. Recruitment resources such as businesses, organizations, professional associations, alumni groups, listservs and trade journals can be utilized by departments to aid in the search process. SR/OPs needing assistance in identifying other potential recruitment resources may contact Human Resources Client Services.
            </p>
          </div>

          {/* Example 3 */}
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-bold text-[#2F2F2F] mb-4">
              Example 3:
            </h2>
            <p className="text-[11px] lg:text-[18px] md:text-base leading-relaxed text-[#2F2F2F] mb-4">
              The purpose of this policy is to outline the Wayne State University attendance standards.
            </p>
            <p className="text-[11px] lg:text-[18px] md:text-base leading-relaxed text-[#2F2F2F] mb-4">
              Each employee is an important contributor to the University's mission and each employee is needed at work to assist in accomplishment of the University's goals and objectives. Absenteeism and tardiness negatively impact services provided to students and the University community. Absenteeism also sows the morale of other employees who have to perform the work of the absent employee.
            </p>
            <p className="text-[11px] lg:text-[18px] md:text-base leading-relaxed text-[#2F2F2F] mb-4">
              To ensure effective and efficient operations of the University and provide the best possible work environment to employees, the University expects employees to adhere to the attendance standards as outlined in this policy.
            </p>
            <p className="text-[11px] lg:text-[18px] md:text-base leading-relaxed text-[#2F2F2F] mb-4">
              Please feel free to contact the WSU Policy Office at 313-577-5580, for further assistance in drafting policy statements.
            </p>
          </div>

          {/* Example 4 */}
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-bold text-[#2F2F2F] mb-4">
              Example 4 (For presidential policies):
            </h2>
            <p className="text-[11px] lg:text-[18px] md:text-base leading-relaxed text-[#2F2F2F] mb-4">
              The purpose of this University Policy is to clarify rulemaking procedures from the Office of the President, and the procedure for the development, review and approval of policies initiated at other levels or by other bodies in the University. The decision-making authority upon which this University Policy is based follows existing Statutes and actions of the Board of Governors.
            </p>
          </div>

          {/* Example 5 */}
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-bold text-[#2F2F2F] mb-4">
              Example 5 (For administrative regulations):
            </h2>
            <p className="text-[11px] lg:text-[18px] md:text-base leading-relaxed text-[#2F2F2F] mb-4">
              This policy has been established to ensure consistency of all external advertisement of university positions. External advertisements are supplemental to internal postings and recruitment/hiring policy requirements. Recruitment resources such as businesses, organizations, professional associations, alumni groups, listservs and trade journals can be utilized by departments to aid in the search process. SR/OPs needing assistance in identifying other potential recruitment resources may contact Human Resources Client Services.
            </p>
          </div>

          {/* Example 6 */}
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-bold text-[#2F2F2F] mb-4">
              Example 6:
            </h2>
            <p className="text-[11px] lg:text-[18px] md:text-base leading-relaxed text-[#2F2F2F] mb-4">
              The purpose of this policy is to outline the Wayne State University attendance standards.
            </p>
            <p className="text-[11px] lg:text-[18px] md:text-base leading-relaxed text-[#2F2F2F] mb-4">
              Each employee is an important contributor to the University's mission and each employee is needed at work to assist in accomplishment of the University's goals and objectives. Absenteeism and tardiness negatively impact services provided to students and the University community. Absenteeism also sows the morale of other employees who have to perform the work of the absent employee.
            </p>
            <p className="text-[11px] lg:text-[18px] md:text-base leading-relaxed text-[#2F2F2F] mb-4">
              To ensure effective and efficient operations of the University and provide the best possible work environment to employees, the University expects employees to adhere to the attendance standards as outlined in this policy.
            </p>
            <p className="text-[11px] lg:text-[18px] md:text-base leading-relaxed text-[#2F2F2F]">
              Please feel free to contact the WSU Policy Office at 313-577-5580, for further assistance in drafting policy statements.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}