import React from "react"

export const AuthModalContent = () => {
	return (
		<div className="pr-0 md:pr-6 md:border-r border-border">
			<div className="hidden md:block">
				<h2 className="text-2xl font-bold font-varela-round text-foreground mb-4">
					Simple Online Weight Tracker
				</h2>
				<p className="text-muted-foreground mb-6 leading-relaxed">
					The easiest way to track your weight log online. No bloat, just simple daily weight logging with powerful features.
				</p>
			</div>

			<div className="space-y-4 mb-6">
				<div className="flex items-start gap-3">
					<div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
					<div>
						<h3 className="font-semibold font-varela-round text-foreground">Beautiful Weight Charts</h3>
						<p className="text-sm text-muted-foreground">Visualize trends with easy-to-read charts.</p>
					</div>
				</div>

				<div className="flex items-start gap-3">
					<div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
					<div>
						<h3 className="font-semibold font-varela-round text-foreground">CSV Export</h3>
						<p className="text-sm text-muted-foreground">Your data, your control.</p>
					</div>
				</div>

				<div className="flex items-start gap-3">
					<div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
					<div>
						<h3 className="font-semibold font-varela-round text-foreground">No bloated features</h3>
					</div>
				</div>
			</div>

			<a
				href="/faq"
				className="text-sm font-medium text-link hover:underline inline-flex items-center gap-1"
			>
				Have questions? Check out our FAQ
				<span aria-hidden="true">→</span>
			</a>
		</div>
	)
}
