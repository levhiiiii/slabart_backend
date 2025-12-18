import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardSummary(req: any): Promise<import("./dashboard.service").DashboardSummary>;
}
