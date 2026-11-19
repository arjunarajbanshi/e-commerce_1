
import React from "react";
import {
    MdLocalShipping,
    MdLibraryAddCheck,
    MdAccountBalance,
} from "react-icons/md";
import { HiCheck } from "react-icons/hi2";

const CheckoutPath = ({ activePath = 0 }) => {
    const steps = [
        { label: "Shipping Details", icon: MdLocalShipping },
        { label: "Confirm Order", icon: MdLibraryAddCheck },
        { label: "Payment", icon: MdAccountBalance },
    ];

    const currentStep = Math.min(
        Math.max(activePath, 0),
        steps.length - 1
    );

    const progress = (currentStep / (steps.length - 1)) * 100;

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className="relative">

                {/* Progress Track */}
                <div className="absolute top-6 left-[16.67%] right-[16.67%] h-[3px] bg-gray-200 rounded-full">
                    <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Steps */}
                <div className="relative flex justify-between">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted = currentStep > index;
                        const isActive = currentStep === index;
                        const isReached = currentStep >= index;

                        return (
                            <div
                                key={step.label}
                                className="flex flex-col items-center w-1/3"
                            >
                                {/* Icon Circle */}
                                <div
                                    className={`
                                        relative z-10 w-12 h-12 rounded-full
                                        flex items-center justify-center
                                        transition-all duration-300
                                        ${
                                            isCompleted
                                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                                : isActive
                                                ? "bg-white text-indigo-600 border-2 border-indigo-600 ring-4 ring-indigo-100 shadow-lg shadow-indigo-100"
                                                : "bg-white text-gray-400 border-2 border-gray-200"
                                        }
                                    `}
                                >
                                    {isCompleted ? (
                                        <HiCheck className="w-6 h-6" />
                                    ) : (
                                        <Icon className="w-6 h-6" />
                                    )}
                                </div>

                                {/* Step Label */}
                                <div className="mt-3 text-center">
                                    <p
                                        className={`
                                            text-xs sm:text-sm font-semibold
                                            transition-colors duration-300
                                            ${
                                                isReached
                                                    ? "text-gray-900"
                                                    : "text-gray-400"
                                            }
                                        `}
                                    >
                                        {step.label}
                                    </p>

                                    <p
                                        className={`
                                            hidden sm:block text-[11px] mt-1
                                            ${
                                                isCompleted
                                                    ? "text-indigo-600"
                                                    : isActive
                                                    ? "text-indigo-600"
                                                    : "text-gray-400"
                                            }
                                        `}
                                    >
                                        {isCompleted
                                            ? "Completed"
                                            : isActive
                                            ? "In Progress"
                                            : "Upcoming"}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPath;
