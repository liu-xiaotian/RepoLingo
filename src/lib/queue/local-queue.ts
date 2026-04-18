// 本地任务队列实现

import { EventEmitter } from "events";

export interface Job<T> {
  id: string;
  data: T;
  status: "pending" | "running" | "completed" | "failed";
  result?: any;
  error?: Error;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export class LocalQueue<T> extends EventEmitter {
  // 存储任务的映射表，键为任务ID（string），值为任务对象 Job<T>
  // Map 提供快速查找、添加和删除任务的能力
  private jobs: Map<string, Job<T>> = new Map();

  // 队列数组，存储任务ID的顺序，用于按顺序处理任务
  private queue: string[] = [];

  // 并发数限制，表示同时最多可以运行多少个任务
  private concurrency: number;

  // 当前正在运行的任务数量
  private running: number = 0;

  // 处理任务的函数，可选，用于执行队列中的任务
  // 接收类型为 T 的数据，返回一个 Promise，表示异步操作
  private processor?: (data: T) => Promise<any>;

  constructor(concurrency: number = 3) {
    super();
    this.concurrency = concurrency;
  }

  setProcessor(fn: (data: T) => Promise<any>) {
    this.processor = fn;
  }

  async add(data: T): Promise<string> {
    const id = crypto.randomUUID();
    const job: Job<T> = {
      id,
      data,
      status: "pending",
      createdAt: new Date(),
    };

    this.jobs.set(id, job);
    this.queue.push(id);
    this.process();

    return id;
  }

  private async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }

    const jobId = this.queue.shift();
    if (!jobId) return;

    const job = this.jobs.get(jobId);
    if (!job) return;

    this.running++;
    job.status = "running";
    job.startedAt = new Date();
    this.emit("active", job);

    try {
      if (!this.processor) {
        throw new Error("No processor set for queue");
      }

      job.result = await this.processor(job.data);
      job.status = "completed";
      job.completedAt = new Date();
      this.emit("completed", job);
    } catch (error) {
      job.status = "failed";
      job.error = error as Error;
      job.completedAt = new Date();
      this.emit("failed", job, error);
    } finally {
      this.running--;
      this.process();
    }
  }

  getJob(id: string): Job<T> | undefined {
    return this.jobs.get(id);
  }

  getAllJobs(): Job<T>[] {
    return Array.from(this.jobs.values());
  }

  clear() {
    this.jobs.clear();
    this.queue = [];
  }
}

// 翻译任务队列数据类型
export interface TranslationJobData {
  taskId: string;
  userId: string;
  repositoryId: string;
  targetLanguages: string[];
}

// 创建全局翻译队列实例
export const translationQueue = new LocalQueue<TranslationJobData>(3);
